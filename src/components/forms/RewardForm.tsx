// app/rewards/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateRewardDto } from "@/presentation/dto/create-reward.dto";

export default function RewardForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateRewardDto>({
    creatorId: 1, // On définit une valeur par défaut
    title: "",
    description: "",
    points: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/rewards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || "Erreur lors de la création de la récompense"
        );
      }

      setSuccess(true);
      setFormData({
        ...formData,
        title: "",
        description: "",
        points: 0,
      });

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Créer une nouvelle récompense</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Récompense créée avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Titre
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-32"
            required
          />
        </div>

        <div>
          <label
            htmlFor="points"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Points nécessaires
          </label>
          <input
            id="points"
            type="number"
            value={formData.points}
            onChange={(e) =>
              setFormData({ ...formData, points: parseInt(e.target.value) })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
            min="0"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Créer la récompense
        </button>
      </form>
    </div>
  );
}
