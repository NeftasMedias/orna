import { site } from "@/config/site";

export function AnnouncementBar() {
  if (!site.announcementText.trim()) return null;
  return (
    <div className="bg-navy px-4 py-2 text-center text-[13px] leading-snug tracking-wide text-surface">
      {site.announcementText}
    </div>
  );
}
