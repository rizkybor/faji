import {getTranslations} from 'next-intl/server';
import { Play, Calendar, Clock, Eye, Share2, Bell } from 'lucide-react';
import Image from 'next/image';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const t = await getTranslations({locale, namespace: 'LivePage'});
 
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function LivePage({params: {locale}}: {params: {locale: string}}) {
  const t = await getTranslations({locale, namespace: 'LivePage'});

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-faji-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-faji-green/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
           <div className="flex items-center gap-3 mb-2">
             <span className="flex h-3 w-3 relative">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
             </span>
             <span className="font-bold tracking-widest uppercase text-red-500 text-sm">
               {t('liveNow')}
             </span>
           </div>
           <h1 className="text-3xl md:text-5xl font-bold">{t('title')}</h1>
        </div>

        {/* Main Player */}
        <div className="mb-12">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 ring-1 ring-white/5 group">
            <div className="absolute inset-0 bg-slate-900 z-0">
                 {/* Placeholder if iframe doesn't load immediately or for aesthetics */}
                 <Image 
                    src="https://images.unsplash.com/photo-1549904625-6ca1bd49c947?q=80&w=2142&auto=format&fit=crop" 
                    alt="Live Background" 
                    fill
                    className="object-cover opacity-50 blur-sm"
                 />
            </div>
            <iframe 
              src="https://www.youtube.com/embed/jfKfPfyJRdk?si=dummy&autoplay=1&mute=1" 
              title="FAJI Live Stream" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen 
              className="absolute inset-0 w-full h-full z-10"
            ></iframe>
          </div>
          <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-white">{t('eventTitle')}</h2>
              <p className="text-slate-400">{t('eventSubtitle')}</p>
            </div>
            <div className="flex gap-4">
               <button className="flex items-center gap-2 bg-faji-blue hover:bg-faji-blue/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-faji-blue/20">
                 <Share2 className="w-4 h-4" />
                 {t('share')}
               </button>
               <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 rounded-xl font-bold transition-all border border-white/10 hover:border-white/20">
                 <Bell className="w-4 h-4" />
                 {t('subscribe')}
               </button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Upcoming Schedule */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-bold mb-6 text-faji-green flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {t('upcoming')}
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="group bg-slate-800/50 p-4 rounded-xl border border-white/5 hover:border-faji-green/50 transition-all cursor-pointer hover:bg-slate-800">
                    <div className="flex items-center gap-2 text-xs text-faji-blue font-bold mb-1 uppercase tracking-wider">
                      <Clock className="w-3 h-3" />
                      {t('comingSoon')}
                    </div>
                    <h3 className="font-bold text-white mb-2 group-hover:text-faji-green transition-colors">{t('itemTitle')} {i}</h3>
                    <div className="text-sm text-slate-400">Oct {20 + i}, 2025 • 10:00 WIB</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Replays */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <Play className="w-5 h-5 text-faji-blue" />
              {t('recent')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-900 border border-white/5">
                    <Image 
                      src={`https://images.unsplash.com/photo-${i % 2 === 0 ? '1596423736737-2e11831887e4' : '1563811771123-5e927c152940'}?q=80&w=600&auto=format&fit=crop`} 
                      alt="Replay thumbnail" 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-mono text-white">12:30</div>
                  </div>
                  <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-faji-green transition-colors text-white">{t('replayTitle')}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> 1.2K</span>
                    <span>•</span>
                    <span>{t('timeAgo')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
