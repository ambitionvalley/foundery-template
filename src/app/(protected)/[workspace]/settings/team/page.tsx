import { TeamMembers } from "@/features/settings/components/team-members";

export const metadata = { title: "Team" };

export default function TeamSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[16px] leading-[24px] font-semibold text-black">
        Team
      </h1>
      <TeamMembers />
    </div>
  );
}
