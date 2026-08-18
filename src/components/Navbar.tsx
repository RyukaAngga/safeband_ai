const navLinks = [
  { label: 'Product', href: '#about' },
  { label: 'Demo', href: '#demo' },
  { label: 'How It Works', href: '#about' },
]

export default function Navbar() {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-center z-50">
      <nav
        className="bg-black/80 backdrop-blur-md border border-white/10 rounded-b-2xl md:rounded-b-3xl px-5 py-2.5 md:px-8 md:py-3 shadow-2xl"
        aria-label="Main navigation"
      >
        <ul className="flex items-center gap-6 sm:gap-10 md:gap-14">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-xs sm:text-sm font-medium tracking-wide transition-colors duration-200 whitespace-nowrap"
                style={{ color: 'rgba(225, 224, 204, 0.85)' }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = '#E1E0CC'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color =
                    'rgba(225, 224, 204, 0.85)'
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
