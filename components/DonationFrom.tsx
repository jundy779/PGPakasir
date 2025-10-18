"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DonationForm() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const order_id = `YSW-${Date.now()}`;
    const res = await fetch("/api/donate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parseInt(amount), order_id, name, message }),
    });
    const { pay_url } = await res.json();
    if (pay_url) window.location.href = pay_url; 
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Nominal (IDR)</Label>
        <Input
          type="number"
          placeholder="50000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Nama (opsional)</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label>Pesan (opsional)</Label>
        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Donasi"}
      </Button>
    </form>
  );
}