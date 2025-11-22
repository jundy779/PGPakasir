"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Loader2 } from "lucide-react";
import { formatNumber, parseNumber, formatCurrency } from "@/lib/utils";

const QUICK_AMOUNTS = [10000, 25000, 50000, 100000, 250000];

export default function DonationForm() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
    setError(null);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, "");
    if (rawValue === "") {
      setAmount("");
      setError(null);
      return;
    }
    
    const numValue = parseInt(rawValue);
    if (!isNaN(numValue)) {
      setAmount(numValue.toString());
      setError(null);
    }
  };

  const displayAmount = amount ? formatNumber(amount) : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const order_id = `YSW-${Date.now()}`;
      const numericAmount = parseInt(amount);
      
      if (numericAmount < 2000) {
        throw new Error("Minimum donasi adalah Rp 2.000");
      }
      
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: numericAmount, order_id, name, message }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Terjadi kesalahan" }));
        throw new Error(errorData.error || "Gagal membuat payment URL");
      }

      const data = await res.json();
      if (data.pay_url) {
        window.location.href = data.pay_url;
      } else {
        throw new Error("Payment URL tidak diterima dari server");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat memproses donasi");
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Form Donasi
        </CardTitle>
        <CardDescription>
          Pilih nominal atau masukkan jumlah yang ingin didonasikan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Amount Buttons */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Pilih Nominal Cepat
            </Label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {QUICK_AMOUNTS.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleQuickAmount(value)}
                  aria-pressed={amount === value.toString()}
                  aria-label={`Pilih nominal ${formatCurrency(value)}`}
                  className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    amount === value.toString()
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background hover:bg-muted border-border"
                  }`}
                >
                  {value >= 1000
                    ? `Rp ${(value / 1000).toFixed(0)}K`
                    : `Rp ${value}`}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount Input */}
          <div>
            <Label htmlFor="amount" className="text-sm font-medium mb-2 block">
              Atau Masukkan Nominal
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium" aria-hidden="true">
                Rp
              </span>
              <Input
                id="amount"
                type="text"
                inputMode="numeric"
                placeholder="50.000"
                value={displayAmount}
                onChange={handleAmountChange}
                className="pl-10 h-11 text-base"
                required
                aria-label="Masukkan nominal donasi"
                aria-describedby="amount-hint amount-min"
                aria-invalid={error ? "true" : "false"}
                aria-required="true"
              />
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <p id="amount-min" className="text-xs text-muted-foreground">
                Minimum donasi: Rp 2.000
              </p>
              {amount && parseInt(amount) >= 2000 && (
                <p className="text-xs text-primary font-medium">
                  {formatCurrency(amount)}
                </p>
              )}
            </div>
          </div>

          {/* Name Input */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium mb-2 block">
              Nama <span className="text-muted-foreground font-normal">(opsional)</span>
            </Label>
              <Input
                id="name"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11"
                aria-label="Nama donatur (opsional)"
                maxLength={100}
              />
          </div>

          {/* Message Input */}
          <div>
            <Label htmlFor="message" className="text-sm font-medium mb-2 block">
              Pesan <span className="text-muted-foreground font-normal">(opsional)</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Tinggalkan pesan dukungan..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px] resize-none"
              aria-label="Pesan dukungan (opsional)"
              maxLength={500}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div 
              role="alert"
              aria-live="polite"
              className="p-4 text-sm text-red-600 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg"
            >
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || !amount || (amount ? parseInt(amount) < 2000 : false)}
            className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all"
            size="lg"
            aria-label={loading ? "Memproses donasi" : "Lanjutkan donasi"}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <Heart className="mr-2 h-4 w-4" />
                Lanjutkan Donasi
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

