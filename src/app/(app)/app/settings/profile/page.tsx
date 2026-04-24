import { ProfileForm } from "@/features/settings/components/profile-form";

export const metadata = { title: "Profile" };

export default function ProfileSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[16px] leading-[24px] font-semibold text-black">
        Profile
      </h1>
      <ProfileForm />
    </div>
  );
}
