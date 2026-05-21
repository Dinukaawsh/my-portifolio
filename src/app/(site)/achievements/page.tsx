import type { Metadata } from "next";
import Achievements from "@/app/components/pages/achivements/achievements";

export const metadata: Metadata = {
  title: "Achievements | Dinuka Wickramarathna",
  description: "Awards and notable achievements.",
};

export default function AchievementsPage() {
  return <Achievements />;
}
