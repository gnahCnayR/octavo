"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  showBackButton?: boolean
  showNavigation?: boolean
  rightContent?: React.ReactNode
}

export function Header({ showBackButton = false, showNavigation = true, rightContent }: HeaderProps) {
  return (
    <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <Link href="/">
                <Button variant="ghost" size="sm" className="p-1.5 h-auto hover:bg-muted">
                  <ArrowLeft className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </Button>
              </Link>
            )}
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
                <img src="/logo.svg" alt="Octavo" className="w-4 h-4" />
              </div>
              <span className="text-xl font-semibold text-foreground">octavo</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {rightContent}
            {showNavigation && (
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/discover" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Discover
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Memories
                </Link>
                <Link href="/chat" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Chat
                </Link>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 