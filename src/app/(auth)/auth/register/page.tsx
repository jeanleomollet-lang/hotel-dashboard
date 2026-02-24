"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Hotel, Eye, EyeOff, Loader2, Check } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    hotelName: "",
    hotelCity: "",
    hotelStars: 3,
    hotelRooms: 20,
  });

  const [showPassword, setShowPassword] = useState(false);

  const updateForm = (key: string, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de la création du compte");
        return;
      }

      router.push("/auth/login?registered=true");
    } catch {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 mb-4">
          <Hotel className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Créer votre compte</h1>
        <p className="text-sm text-gray-500 mt-1">
          14 jours d&apos;essai gratuit, sans engagement
        </p>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s
                  ? "bg-brand-600 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {step > s ? <Check className="w-4 h-4" /> : s}
            </div>
            <span
              className={`text-sm ${
                step >= s ? "text-gray-700 font-medium" : "text-gray-400"
              }`}
            >
              {s === 1 ? "Votre profil" : "Votre hôtel"}
            </span>
            {s < 2 && <div className="w-12 h-0.5 bg-gray-200 mx-1" />}
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {step === 1 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => updateForm("firstName", e.target.value)}
                    placeholder="Jean"
                    required
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => updateForm("lastName", e.target.value)}
                    placeholder="Dupont"
                    required
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email professionnel
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  placeholder="jean@monhotel.com"
                  required
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => updateForm("password", e.target.value)}
                    placeholder="Minimum 8 caractères"
                    required
                    minLength={8}
                    className="input pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (form.firstName && form.lastName && form.email && form.password.length >= 8) {
                    setStep(2);
                  }
                }}
                className="w-full btn-primary justify-center py-2.5"
              >
                Continuer
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nom de l&apos;hôtel
                </label>
                <input
                  type="text"
                  value={form.hotelName}
                  onChange={(e) => updateForm("hotelName", e.target.value)}
                  placeholder="Le Grand Hôtel"
                  required
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Ville
                </label>
                <input
                  type="text"
                  value={form.hotelCity}
                  onChange={(e) => updateForm("hotelCity", e.target.value)}
                  placeholder="Paris"
                  className="input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Classification
                  </label>
                  <select
                    value={form.hotelStars}
                    onChange={(e) => updateForm("hotelStars", parseInt(e.target.value))}
                    className="select"
                  >
                    {[1, 2, 3, 4, 5].map((s) => (
                      <option key={s} value={s}>
                        {"★".repeat(s)} {s} étoile{s > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nombre de chambres
                  </label>
                  <input
                    type="number"
                    value={form.hotelRooms}
                    onChange={(e) => updateForm("hotelRooms", parseInt(e.target.value))}
                    min={1}
                    max={1000}
                    className="input"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1 justify-center py-2.5"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 justify-center py-2.5 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Créer mon compte"
                  )}
                </button>
              </div>
            </>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Déjà un compte ?{" "}
            <Link
              href="/auth/login"
              className="text-brand-600 hover:text-brand-700 font-medium"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
