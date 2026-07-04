const GITHUB_OWNER = process.env.INVOICE_GITHUB_OWNER!
const GITHUB_REPO = process.env.INVOICE_GITHUB_REPO!
const GITHUB_TOKEN = process.env.INVOICE_GITHUB_TOKEN!
const GITHUB_BRANCH = process.env.INVOICE_GITHUB_BRANCH || "main"

/**
 * Uploads a PDF buffer to the invoices GitHub repository.
 * Files are organised as: invoices/YYYY/INVOICE_NUMBER.pdf
 */
export async function uploadInvoiceToGitHub(
  invoiceNumber: string,
  pdfBuffer: Buffer
): Promise<string> {
  console.log(`[github-storage] Starting upload for ${invoiceNumber}, buffer size: ${pdfBuffer.length} bytes`)

  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const path = `invoices/${year}/${month}/${invoiceNumber}.pdf`
  const content = pdfBuffer.toString("base64")
  const message = `Add invoice ${invoiceNumber}`

  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`
  console.log(`[github-storage] Target URL: ${url}`)
  console.log(`[github-storage] Owner: ${GITHUB_OWNER}, Repo: ${GITHUB_REPO}, Branch: ${GITHUB_BRANCH}`)

  // Check if the file already exists (to get its SHA for updates)
  let sha: string | undefined
  console.log(`[github-storage] Checking if file already exists...`)
  const existing = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })
  console.log(`[github-storage] Existence check response: ${existing.status} ${existing.statusText}`)
  if (existing.ok) {
    const data = await existing.json() as { sha: string }
    sha = data.sha
    console.log(`[github-storage] File exists, sha: ${sha}`)
  } else if (existing.status !== 404) {
    console.warn(`[github-storage] Unexpected status on existence check: ${existing.status}`)
  }

  const body: Record<string, unknown> = {
    message,
    content,
    branch: GITHUB_BRANCH,
  }
  if (sha) body.sha = sha

  console.log(`[github-storage] Uploading file via PUT...`)
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error(`[github-storage] Upload FAILED: ${response.status} ${response.statusText}`)
    console.error(`[github-storage] Error body: ${error}`)
    throw new Error(`GitHub upload failed (${response.status}): ${error}`)
  }

  const result = await response.json() as { content: { html_url: string } }
  console.log(`[github-storage] Upload successful: ${result.content.html_url}`)
  return result.content.html_url
}
