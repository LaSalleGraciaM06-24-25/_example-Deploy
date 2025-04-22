'use client';
import Link from 'next/link';
// import { Typography, List, ListItem } from '../components/ui';

export default function Home() {
  return (
    <main className="p-8 flex flex-col gap-10">
      {/* <Typography variant="h1" color="amber" className="font-bold text-center">
        Mission: Red Planet
      </Typography>
      <List className="flex flex-col gap-4 justify-center items-center">
        <ListItem>
          <Link href="/resourcePanel">Resource Panel</Link>
        </ListItem>
      </List> */}
      <h1 className="font-bold text-center text-amber-700">
        Mission: Red Planet
      </h1>
      <ul className="flex flex-col gap-4 justify-center items-center">
        <li>
          <Link href="/resourcePanel">Resource Panel</Link>
        </li>
      </ul>
    </main>
  );
}
