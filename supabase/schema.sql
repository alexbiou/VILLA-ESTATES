create table if not exists booking_requests (
  id uuid primary key default gen_random_uuid(),
  villa_slug text not null,
  check_in date not null,
  check_out date not null,
  guests int not null check (guests > 0),
  guest_name text not null,
  guest_email text not null,
  guest_phone text,
  message text,
  nights int not null,
  estimated_total numeric not null,
  status text not null default 'pending' check (status in ('pending','cancelled')),
  created_at timestamptz not null default now()
);
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, message text not null,
  created_at timestamptz not null default now()
);
-- RLS on, no public policies: only the server route (service role) can write.
alter table booking_requests enable row level security;
alter table contact_messages enable row level security;
