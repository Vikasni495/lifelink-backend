import Navbar from "../components/Navbar";
import bloodDonationImg from "../assets/blood-donation.jpg";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <Navbar />

      <main className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-6">
        <section className="flex flex-col justify-center gap-8">
          <div className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm ring-1 ring-sky-100">
            AI-Powered Emergency Matching
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Right blood. <span className="block text-emerald-600">Right time.</span>
              <span className="block text-sky-600">Right person.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              LifeLink AI instantly connects blood donors and recipients through smart matching, real-time emergency alerts, and trusted community support.
            </p>
            <p className="max-w-2xl text-base leading-7 text-slate-500">
              Safe donor matching, urgent request prioritization, and intelligent recommendations for lifesaving care.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <a
              href="/login"
              className="rounded-full bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Request Blood
            </a>
            <a
              href="/register"
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Register Donor
            </a>
            <a
              href="/admin/login"
              className="rounded-full bg-sky-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              🛡️ Admin Portal
            </a>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-slate-200 sm:p-10 lg:p-12">
          <div className="overflow-hidden rounded-[1.75rem] bg-slate-100 shadow-inner">
            <img
              src={bloodDonationImg}
              alt="Blood donation"
              className="h-full w-full min-h-[320px] object-cover"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
