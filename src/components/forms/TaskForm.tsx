"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "@/models/User";
import { Loader } from "lucide-react";

interface TaskFormData {
  userId: number;
  title: string;
  description: string;
  points: number;
  dueDate: string;
}

export default function TaskForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<TaskFormData>({
    userId: 0,
    title: "",
    description: "",
    points: 0,
    dueDate: "",
  });
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fecthUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      console.log(data);
      setUsers(data);
    };
    fecthUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          dueDate: new Date(formData.dueDate),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la création de la tâche");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue"
      );
    } finally {
      setSuccess(true);
      setTimeout(() => {
        setFormData({
          userId: 0,
          title: "",
          description: "",
          points: 0,
          dueDate: "",
        });

        router.refresh();
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Créer une nouvelle tâche</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Tâche créée avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-4">
        <section className="col-span-4 space-y-4">
          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Utilisateur assigné
            </label>
            <select
              id="userId"
              value={formData.userId}
              onChange={(e) => {
                setFormData({ ...formData, userId: parseInt(e.target.value) });
              }}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="0">Choisissez un utilisateur</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

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
        </section>
        <section className="space-y-4">
          <div>
            <label
              htmlFor="points"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Points
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

          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date d'échéance
            </label>
            <input
              id="dueDate"
              type="datetime-local"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </section>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full col-span-5 col-start-5 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader className="animate-spin" />
              Envoi ...
            </span>
          ) : (
            "Créer la tâche"
          )}
        </button>
      </form>
    </div>
  );
}
