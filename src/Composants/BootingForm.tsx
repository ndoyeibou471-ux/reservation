import { useState } from "react";

export type Booking = {
  id: number;
  name: string;
  email: string;
  date: string;
};

type Props = {
  addBooking: (booking: Booking) => void;
};

export default function BookingForm({ addBooking }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !date) {
      setError("Tous les champs sont obligatoires ❌");
      setSuccess("");
      return;
    }

    if (!email.includes("@")) {
      setError("Email invalide ❌");
      setSuccess("");
      return;
    }

    // CREATE
    const newBooking: Booking = {
      id: Date.now(),
      name,
      email,
      date,
    };

    addBooking(newBooking);

    // Reset
    setName("");
    setEmail("");
    setDate("");

    setError("");
    setSuccess("Réservation réussie ✅");
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 20, marginBottom: 20 }}>
      <h2>Formulaire de réservation</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br /><br />

        <button type="submit">Réserver</button>
      </form>

      {/* Messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}