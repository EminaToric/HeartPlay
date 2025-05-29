import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HeartPlayApp() {
  const [age, setAge] = useState(4);
  const [interests, setInterests] = useState("");
  const [time, setTime] = useState(30);
  const [setting, setSetting] = useState("indoor");
  const [activities, setActivities] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateActivities() {
    setLoading(true);
    setActivities("");
    const res = await fetch("http://localhost:8000/generate-activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        age: Number(age),
        interests: interests.split(",").map((i) => i.trim()),
        time_available: Number(time),
        setting: setting
      })
    });
    const data = await res.json();
    setActivities(data.activities || "Something went wrong.");
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4 flex flex-col items-center text-gray-800">
      <h1 className="text-4xl font-bold mb-4">💖 HeartPlay</h1>
      <p className="mb-6 text-center max-w-xl">
        Discover joyful, development-friendly bonding activities for you and your child ✨
      </p>

      <div className="grid gap-4 w-full max-w-md">
        <Input type="number" placeholder="Child's age (e.g., 4)" value={age} onChange={(e) => setAge(e.target.value)} />
        <Input type="text" placeholder="Interests (e.g., animals, art, dancing)" value={interests} onChange={(e) => setInterests(e.target.value)} />
        <Input type="number" placeholder="Time available (minutes)" value={time} onChange={(e) => setTime(e.target.value)} />
        <select className="p-2 rounded border" value={setting} onChange={(e) => setSetting(e.target.value)}>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </select>
        <Button onClick={generateActivities} disabled={loading}>
          {loading ? "Generating..." : "Generate Activities"}
        </Button>
      </div>

      {activities && (
        <Card className="mt-8 w-full max-w-xl bg-white shadow-md">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">🎉 Here are your HeartPlay moments:</h2>
            <Textarea readOnly value={activities} className="whitespace-pre-wrap bg-pink-100" rows={8} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
