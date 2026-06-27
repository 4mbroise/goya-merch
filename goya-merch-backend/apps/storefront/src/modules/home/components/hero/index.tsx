import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="h-[85vh] w-full border-b border-goya-border relative bg-goya-bg flex flex-col justify-center items-center text-center px-6 gap-8">
      <div className="flex flex-col gap-4 items-center">
        <Image
          src="/Typo-white.svg"
          alt="GOYA"
          width={400}
          height={400}
          className="w-full max-w-[350px] small:max-w-[500px] h-auto"
          priority
        />
        <p className="text-sm tracking-[0.4em] uppercase text-goya-fg-subtle">
          Official Merch
        </p>
      </div>
      <LocalizedClientLink
        href="/store"
        className="mt-4 px-8 py-3 border border-goya-fg text-goya-fg text-sm tracking-widest uppercase hover:bg-goya-fg hover:text-goya-ink transition-colors duration-200"
      >
        Shop Now
      </LocalizedClientLink>
    </div>
  )
}

export default Hero
