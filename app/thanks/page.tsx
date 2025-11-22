import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Heart, Home, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Terima Kasih - YoSawer",
  description: "Terima kasih atas donasi dan dukungan Anda!",
  robots: {
    index: false,
    follow: false,
  },
};

type PaymentStatus = "success" | "pending" | "failed" | "unknown";

interface ThanksPageProps {
  searchParams: Promise<{
    status?: string;
    amount?: string;
    order_id?: string;
  }>;
}

export default async function Thanks({ searchParams }: ThanksPageProps) {
  const params = await searchParams;
  const status: PaymentStatus = (params.status as PaymentStatus) || "success";
  const amount = params.amount ? parseInt(params.amount) : null;
  const orderId = params.order_id || null;

  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          icon: CheckCircle2,
          iconColor: "text-green-600 dark:text-green-500",
          bgColor: "bg-green-100 dark:bg-green-900/20",
          title: "Makasih Bro! 🫶",
          description: "Donasi lo udah masuk, appreciatenya luar biasa!",
          badge: "Pembayaran Berhasil",
          badgeColor: "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
        };
      case "pending":
        return {
          icon: Loader2,
          iconColor: "text-yellow-600 dark:text-yellow-500",
          bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
          title: "Menunggu Pembayaran",
          description: "Pembayaran kamu sedang diproses. Harap tunggu konfirmasi.",
          badge: "Menunggu Konfirmasi",
          badgeColor: "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
        };
      case "failed":
        return {
          icon: AlertCircle,
          iconColor: "text-red-600 dark:text-red-500",
          bgColor: "bg-red-100 dark:bg-red-900/20",
          title: "Pembayaran Gagal",
          description: "Maaf, pembayaran gagal diproses. Silakan coba lagi.",
          badge: "Pembayaran Gagal",
          badgeColor: "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
        };
      default:
        return {
          icon: CheckCircle2,
          iconColor: "text-blue-600 dark:text-blue-500",
          bgColor: "bg-blue-100 dark:bg-blue-900/20",
          title: "Terima Kasih!",
          description: "Terima kasih atas dukungan Anda!",
          badge: "Terima Kasih",
          badgeColor: "bg-primary/10 text-primary border-primary/20",
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center px-4 py-8">
      <Card className="max-w-md w-full border-0 shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${config.bgColor} mb-4 mx-auto animate-in fade-in zoom-in duration-500`}>
            <Icon 
              className={`h-10 w-10 ${config.iconColor} ${status === "pending" ? "animate-spin" : ""}`} 
            />
          </div>
          <CardTitle className="text-3xl font-bold animate-in fade-in slide-in-from-bottom-4 duration-700">
            {config.title}
          </CardTitle>
          <CardDescription className="text-base mt-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            {config.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          {/* Status Badge */}
          <div className="text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${config.badgeColor} font-medium text-sm`}>
              {status === "success" && <CheckCircle2 className="h-4 w-4" />}
              {status === "pending" && <Loader2 className="h-4 w-4 animate-spin" />}
              {status === "failed" && <AlertCircle className="h-4 w-4" />}
              <span>{config.badge}</span>
            </div>
          </div>

          {/* Donation Info */}
          {amount && (
            <div className="bg-muted/50 rounded-lg p-4 text-center border border-border">
              <p className="text-xs text-muted-foreground mb-1">Jumlah Donasi</p>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(amount)}
              </p>
            </div>
          )}

          {orderId && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Order ID: <span className="font-mono text-foreground">{orderId}</span>
              </p>
            </div>
          )}

          {/* Success Message */}
          {status === "success" && (
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <Heart className="h-5 w-5" />
                <span className="font-medium">Terima Kasih Atas Dukungannya!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Dukungan dari kalian sangat berarti untuk terus membuat konten berkualitas. 
                Keep supporting!
              </p>
            </div>
          )}

          {/* Pending Message */}
          {status === "pending" && (
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Kami akan mengirimkan konfirmasi setelah pembayaran berhasil diverifikasi.
                Mohon tunggu beberapa saat.
              </p>
            </div>
          )}

          {/* Failed Message */}
          {status === "failed" && (
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Silakan coba kembali atau hubungi support jika masalah berlanjut.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 space-y-3">
            {status === "failed" && (
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href="/">
                  Coba Lagi
                </Link>
              </Button>
            )}
            <Button asChild className="w-full" size="lg">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}