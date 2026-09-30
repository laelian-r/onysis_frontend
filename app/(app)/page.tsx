import { redirect, RedirectType } from 'next/navigation'

export default async function Home() {
    return redirect('/articles', RedirectType.push);
}