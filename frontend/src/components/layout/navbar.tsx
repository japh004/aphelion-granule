
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, User } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-md">
            <div className="container-custom flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white font-bold text-lg">D</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">Drissman</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/search" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                        Trouver une auto-école
                    </Link>
                    <Link href="/code" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                        Code de la route
                    </Link>
                    <Link href="/partners" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                        Espace Auto-école
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <Button variant="secondary" size="sm" className="hidden md:flex" asChild>
                        <Link href="/login">
                            <User className="h-4 w-4 mr-2" />
                            Connexion
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/register">Devenir Partenaire</Link>
                    </Button>
                    {/* Mobile Menu */}
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </nav>
    );
}
