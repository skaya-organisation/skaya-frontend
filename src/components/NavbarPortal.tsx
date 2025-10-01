
import ReactDOM from 'react-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';

export default function NavbarPortal() {
  const target = document.getElementById('clerk-navbar-btn');
  if (!target) return null;

  return ReactDOM.createPortal(
    <nav className="flex items-center gap-2 ml-2">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'w-8 h-8',
            },
          }}
        />
      </SignedIn>
    </nav>,
    target,
  );
}
