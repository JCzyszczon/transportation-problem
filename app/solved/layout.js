import { Suspense } from "react";

export const metadata = {
    title: 'Solved - Transportation Problem',
}

export default function RootLayout({ children }) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    )
}