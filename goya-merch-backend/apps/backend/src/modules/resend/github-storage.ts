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
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const path = `invoices/${year}/${month}/${invoiceNumber}.pdf`
  const content = pdfBuffer.toString("base64")
  const message = `Add invoice ${invoiceNumber}`

  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`

  // Check if the file already exists (to get its SHA for updates)
  let sha: string | undefined
  const existing = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })
  if (existing.ok) {
    const data = await existing.json() as { sha: string }
    sha = data.sha
  }

  const body: Record<string, unknown> = {
    message,
    content,
    branch: GITHUB_BRANCH,
  }
  if (sha) body.sha = sha

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
    throw new Error(`GitHub upload failed (${response.status}): ${error}`)
  }

  const result = await response.json() as { content: { html_url: string } }
  return result.content.html_url
}
