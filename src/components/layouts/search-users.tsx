// src/components/header/search-user.tsx
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search as IconSearch, Loader2 } from 'lucide-react';
import { GetService } from '@/services/service';
import type { User } from '@/types/user-search';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type Props = {
  className?: string;
  mobile?: boolean; // <sm gunakan Sheet
};

export default function SearchUser({ className, mobile = false }: Props) {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false); // hanya untuk desktop
  const [openSheet, setOpenSheet] = useState(false); // hanya untuk mobile
  const timerRef = useRef<number | null>(null);
  const lastCallId = useRef(0);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // --- fetch dengan debounce ---
  useEffect(() => {
    if (q.trim().length < 2) {
      setUsers([]);
      setLoading(false);
      return;
    }

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(async () => {
      setLoading(true);
      const callId = ++lastCallId.current;
      try {
        const url = `users/search?q=${encodeURIComponent(q.trim())}&page=1&limit=20`;
        const res: any = await GetService(url); // GetService return r.data langsung
        if (lastCallId.current === callId) {
          setUsers((res?.data?.users ?? []) as User[]);
        }
      } catch {
        if (lastCallId.current === callId) setUsers([]);
      } finally {
        if (lastCallId.current === callId) setLoading(false);
      }
    }, 250);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [q]);

  // --- click outside untuk desktop dropdown ---
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const onPick = (username: string) => {
    setQ('');
    setUsers([]);
    setOpenDropdown(false);
    setOpenSheet(false);
    navigate(`/profile/${username}`);
  };

  // ----------------- DESKTOP -----------------
  const Desktop = (
    <div ref={boxRef} className={`relative w-full max-w-xl ${className ?? ''}`}>
      <IconSearch className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400' />
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setOpenDropdown(true)}
        placeholder='Search'
        className='h-10 rounded-full bg-neutral-900 pr-9 pl-9 text-sm text-neutral-200 caret-neutral-200 placeholder:text-neutral-500'
      />
      {loading && (
        <Loader2 className='absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin text-neutral-400' />
      )}

      {/* Dropdown absolut custom (tanpa Radix/Command) */}
      {openDropdown && (
        <div className='absolute top-[calc(100%+8px)] right-0 left-0 z-50 rounded-xl border border-neutral-800 bg-neutral-950 p-0 shadow-lg'>
          {q.trim().length < 2 ? (
            <div className='px-3 py-4 text-sm text-neutral-400 select-none'>
              Ketik minimal 2 huruf…
            </div>
          ) : loading ? (
            <div className='px-3 py-4 text-sm text-neutral-400 select-none'>
              Mencari…
            </div>
          ) : users.length === 0 ? (
            <div className='px-3 py-4 text-sm text-neutral-400 select-none'>
              Tidak ada hasil
            </div>
          ) : (
            <ul className='max-h-[60vh] overflow-auto py-2'>
              {users.map((u) => (
                <li key={u.id}>
                  <button
                    type='button'
                    onClick={() => onPick(u.username)}
                    className='flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-neutral-900 focus:bg-neutral-900 focus:outline-none'
                  >
                    {u.avatarUrl ? (
                      <img
                        src={u.avatarUrl}
                        alt={u.username}
                        className='size-8 rounded-full object-cover'
                      />
                    ) : (
                      <div className='size-8 rounded-full bg-neutral-800' />
                    )}
                    <div className='flex flex-col'>
                      <span className='text-sm font-medium text-neutral-100'>
                        {u.username}
                      </span>
                      <span className='text-xs text-neutral-400'>{u.name}</span>
                    </div>
                  </button>
                </li>
              ))}
              {/* Optional: link ke halaman pencarian penuh */}
              {/* <li className="mt-1 border-t border-neutral-900">
                <Link
                  to={`/search?q=${encodeURIComponent(q.trim())}`}
                  className="block px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-900"
                  onClick={() => setOpenDropdown(false)}
                >
                  Lihat semua hasil
                </Link>
              </li> */}
            </ul>
          )}
        </div>
      )}
    </div>
  );

  // ----------------- MOBILE -----------------
  const Mobile = (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-full'>
          <IconSearch className='size-5' />
          <span className='sr-only'>Search</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side='top'
        className='border-neutral-800 bg-neutral-950/95 backdrop-blur'
      >
        <SheetHeader>
          <SheetTitle className='text-left'>Search</SheetTitle>
        </SheetHeader>

        <div className='mt-4'>
          <div className='relative'>
            <IconSearch className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400' />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder='Search'
              className='h-10 rounded-full bg-neutral-900 pr-9 pl-9 text-sm text-neutral-200 caret-neutral-200 placeholder:text-neutral-500'
              autoFocus
            />
            {loading && (
              <Loader2 className='absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin text-neutral-400' />
            )}
          </div>

          <div className='mt-3 rounded-xl border border-neutral-800'>
            {q.trim().length < 2 ? (
              <div className='px-3 py-4 text-sm text-neutral-400 select-none'>
                Ketik minimal 2 huruf…
              </div>
            ) : loading ? (
              <div className='px-3 py-4 text-sm text-neutral-400 select-none'>
                Mencari…
              </div>
            ) : users.length === 0 ? (
              <div className='px-3 py-4 text-sm text-neutral-400 select-none'>
                Tidak ada hasil
              </div>
            ) : (
              <ul className='max-h-[65vh] overflow-auto py-2'>
                {users.map((u) => (
                  <li key={u.id}>
                    <Link
                      to={`/profile/${u.username}`}
                      onClick={() => setOpenSheet(false)}
                      className='flex items-center gap-2 px-3 py-2 hover:bg-neutral-900'
                    >
                      {u.avatarUrl ? (
                        <img
                          src={u.avatarUrl}
                          alt={u.username}
                          className='size-8 rounded-full object-cover'
                        />
                      ) : (
                        <div className='size-8 rounded-full bg-neutral-800' />
                      )}
                      <div className='flex flex-col'>
                        <span className='text-sm font-medium text-neutral-100'>
                          {u.username}
                        </span>
                        <span className='text-xs text-neutral-400'>
                          {u.name}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return mobile ? Mobile : Desktop;
}
