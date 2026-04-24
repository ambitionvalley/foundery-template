import { ApiKeyList } from "@/features/settings/components/api-key-list";

export const metadata = { title: "API keys" };

export default function ApiKeysSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[16px] leading-[24px] font-semibold text-black">
        API keys
      </h1>
      <ApiKeyList />
    </div>
  );
}
