import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Amar Predictions</h3>
            <p className="text-gray-300 mb-4">
              Get the latest insights on cricket and football games. Stay ahead of the game with Amar Predictions.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/nurislamsojib88500" className="hover:text-blue-400 transition-colors" aria-label="Facebook">
                <Facebook />
              </Link>
              <Link href="#" className="hover:text-blue-400 transition-colors" aria-label="Twitter">
                <Twitter />
              </Link>
              <Link href="https://www.instagram.com/n.i_sojib/#" className="hover:text-blue-400 transition-colors" aria-label="Instagram">
                <Instagram />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cricket" className="hover:text-gray-300 transition-colors">
                  Cricket
                </Link>
              </li>
              <li>
                <Link href="/football" className="hover:text-gray-300 transition-colors">
                  Football
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="hover:text-gray-300 transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300 transition-colors">
                  Support
                </Link>
              </li> */}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2">
              {/* <p className="flex items-center">
                <Phone className="mr-2" size={18} />
                <span>01682934506</span>
              </p> */}
              <p className="flex items-center">
                <Mail className="mr-2" size={18} />
                <a href="mailto:info@gamezone.com" className="hover:text-gray-300 transition-colors">
                  nurislamsj29@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} GameZone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}