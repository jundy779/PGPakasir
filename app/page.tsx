import DonationForm from "../components/DonationFrom";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">YoSawer - Support Gua!</h1>
      <p className="text-muted-foreground mb-6">
        Kalo lo suka konten gua, bisa dikasih sawer disini. 100% langsung ke gua.
      </p>
      <DonationForm />
    </main>
  );
}