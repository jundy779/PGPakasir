import DonationForm from "../components/DonationForm";
import { Heart, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            YoSawer - Support Gua!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Kalo lo suka konten gua, bisa dikasih sawer disini. 100% langsung ke gua tanpa potongan.
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground" role="list">
            <div className="flex items-center gap-2" role="listitem">
              <Shield className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Aman & Terpercaya</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Pembayaran Instan</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <Heart className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>100% untuk Creator</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto">
          <DonationForm />
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Didukung oleh <span className="font-medium text-foreground">Pakasir</span> • 
            QRIS, Virtual Account, & Alfamart/Indomaret
          </p>
        </div>
      </main>
    </div>
  );
}