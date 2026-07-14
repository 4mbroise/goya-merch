import Image from "next/image";
import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import { Text, clx } from "@modules/common/components/ui";

import LocalizedClientLink from "@modules/common/components/localized-client-link";

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  });
  const productCategories = await listCategories();

  return (
    <footer className="border-t border-editorial-border w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-24">
          <div>
            <LocalizedClientLink
              href="/"
              className="flex items-center"
            >
              <Image
                src="/Typo.svg"
                alt="GOYA"
                width={140}
                height={53}
                className="h-8 w-auto"
              />
            </LocalizedClientLink>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="text-label text-editorial-ink">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return;
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li
                        className="flex flex-col gap-2 text-editorial-fg-subtle txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-editorial-ink",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-editorial-ink"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="text-label text-editorial-ink">
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-editorial-fg-subtle txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-editorial-ink"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="text-label text-editorial-ink">GOYA</span>
              <ul className="grid grid-cols-1 gap-y-2 text-editorial-fg-subtle txt-small">
                <li>
                  <a
                    href="https://goya.xyz"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-editorial-ink"
                  >
                    Website
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/goya"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-editorial-ink"
                  >
                    Instagram
                  </a>
                </li>
                <li className="mt-2 border-t border-editorial-border pt-2">
                  <span className="text-label text-editorial-ink">
                    Informations légales
                  </span>
                  <ul className="grid grid-cols-1 gap-y-2 mt-2">
                    <li>
                      <LocalizedClientLink
                        className="hover:text-editorial-ink"
                        href="/cgv"
                      >
                        CGV
                      </LocalizedClientLink>
                    </li>
                    <li>
                      <LocalizedClientLink
                        className="hover:text-editorial-ink"
                        href="/mentions-legales"
                      >
                        Mentions Légales
                      </LocalizedClientLink>
                    </li>
                    <li>
                      <LocalizedClientLink
                        className="hover:text-editorial-ink"
                        href="/politique-de-confidentialite"
                      >
                        Politique de Confidentialité
                      </LocalizedClientLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-16 justify-between text-editorial-fg-muted">
          <Text className="text-breadcrumb">
            © {new Date().getFullYear()} GOYA. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
}
