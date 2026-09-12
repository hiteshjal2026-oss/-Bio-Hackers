import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Workplace, SkilledWorker } from '../../types';
import { MapPin, Navigation, Users, Building, ExternalLink, Sparkles } from 'lucide-react';

interface WorkplacesMapProps {
  workplaces: Workplace[];
  workers: SkilledWorker[];
  selectedWorkplace: Workplace | null;
  onSelectWorkplace: (wp: Workplace) => void;
  onSelectWorker?: (worker: SkilledWorker) => void;
}

export const WorkplacesMap: React.FC<WorkplacesMapProps> = ({
  workplaces,
  workers,
  selectedWorkplace,
  onSelectWorkplace,
  onSelectWorker,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const [mapMode, setMapMode] = useState<'standard' | 'voyager'>('voyager');

  // Initialize or update Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center roughly around US tech innovation corridor
      const map = L.map(mapContainerRef.current, {
        center: [38.5, -96.5],
        zoom: 4,
        zoomControl: false,
        attributionControl: false,
      });

      // Apple-like clean light basemap (CartoDB Voyager)
      const tileUrl = mapMode === 'voyager'
        ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

      L.tileLayer(tileUrl, {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      // Custom zoom control in bottom right like Apple Maps
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    Object.keys(markersRef.current).forEach((key) => {
      const m = markersRef.current[key];
      if (m) m.remove();
    });
    markersRef.current = {};

    // Add custom Apple-styled pins for workplaces
    workplaces.forEach((wp) => {
      const isSelected = selectedWorkplace?.id === wp.id;
      const workerCount = workers.filter((w) => w.workplaceId === wp.id).length;

      // Apple Map custom SVG pin icon
      const customIcon = L.divIcon({
        className: 'apple-map-pin',
        html: `
          <div class="relative group cursor-pointer transition-all duration-300 transform ${
            isSelected ? 'scale-125 z-50' : 'hover:scale-110 z-20'
          }">
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg border ${
              isSelected
                ? 'bg-[#007AFF] text-white border-white ring-4 ring-[#007AFF]/30'
                : 'bg-white/95 dark:bg-[#1C1C1E]/95 text-[#1C1C1E] dark:text-white border-black/10 dark:border-white/20'
            } backdrop-blur-md transition-all">
              <span class="w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-white animate-ping' : 'bg-[#007AFF]'}"></span>
              <span class="text-xs font-semibold tracking-tight whitespace-nowrap">${wp.city}</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded-full ${
                isSelected ? 'bg-white/25 text-white' : 'bg-black/5 dark:bg-white/15 text-[#8E8E93]'
              } font-mono">${workerCount}</span>
            </div>
            <div class="w-2 h-2 mx-auto rotate-45 -mt-1 ${
              isSelected ? 'bg-[#007AFF]' : 'bg-white dark:bg-[#1C1C1E]'
            } border-r border-b ${isSelected ? 'border-transparent' : 'border-black/10 dark:border-white/20'}"></div>
          </div>
        `,
        iconSize: [120, 36],
        iconAnchor: [60, 36],
      });

      const marker = L.marker([wp.lat, wp.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        onSelectWorkplace(wp);
        map.flyTo([wp.lat, wp.lng], 12, { duration: 1.2 });
      });

      markersRef.current[wp.id] = marker;
    });

    // Handle initial or selected flyTo
    if (selectedWorkplace) {
      map.flyTo([selectedWorkplace.lat, selectedWorkplace.lng], 12, { duration: 1.2 });
    }

    // Invalidate map size when container dimensions change
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [workplaces, workers, selectedWorkplace, mapMode]);

  // Clean up on complete unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleCenterAll = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([39.0, -97.0], 4, { duration: 1.2 });
  };

  const selectedWorkers = selectedWorkplace
    ? workers.filter((w) => w.workplaceId === selectedWorkplace.id)
    : [];

  return (
    <div className="relative w-full h-[420px] md:h-[500px] rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] shadow-sm bg-slate-100 dark:bg-zinc-900">
      {/* Actual Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Apple-Style Map Navigation Pill (Top Left) */}
      <div className="absolute top-4 left-4 z-[400] flex items-center gap-2">
        <div className="bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-xl px-3 py-1.5 rounded-full border border-black/10 dark:border-white/15 shadow-md flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse"></div>
          <span className="text-xs font-semibold text-[#1C1C1E] dark:text-white tracking-tight">
            {workplaces.length} Innovation Workplaces Active
          </span>
        </div>

        <button
          onClick={handleCenterAll}
          className="bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-xl p-2 rounded-full border border-black/10 dark:border-white/15 shadow-md text-[#1C1C1E] dark:text-white hover:bg-white dark:hover:bg-[#2C2C2E] transition-all"
          title="Center All Workplaces"
        >
          <Navigation className="w-4 h-4 text-[#007AFF]" />
        </button>
      </div>

      {/* Quick Workplace Chips (Top Right / Scroller) */}
      <div className="absolute top-4 right-4 z-[400] hidden sm:flex items-center gap-1.5 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl p-1 rounded-full border border-black/10 dark:border-white/15 shadow-md">
        {workplaces.map((wp) => {
          const isSelected = selectedWorkplace?.id === wp.id;
          return (
            <button
              key={wp.id}
              onClick={() => {
                onSelectWorkplace(wp);
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.flyTo([wp.lat, wp.lng], 12, { duration: 1.2 });
                }
              }}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                isSelected
                  ? 'bg-[#007AFF] text-white shadow-sm font-semibold'
                  : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
              }`}
            >
              {wp.city}
            </button>
          );
        })}
      </div>

      {/* Floating Selected Workplace Bottom Card (Apple Maps card style) */}
      {selectedWorkplace && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:w-[380px] z-[400] bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-2xl p-4 rounded-2xl border border-black/10 dark:border-white/15 shadow-xl transition-all duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] dark:bg-[#007AFF]/20">
                  {selectedWorkplace.category}
                </span>
                <span className="text-[11px] font-mono text-[#8E8E93]">
                  {selectedWorkplace.code}
                </span>
              </div>
              <h4 className="font-semibold text-sm text-[#1C1C1E] dark:text-white truncate">
                {selectedWorkplace.name}
              </h4>
              <p className="text-xs text-[#8E8E93] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#FF3B30] shrink-0" />
                <span className="truncate">{selectedWorkplace.address}, {selectedWorkplace.city}, {selectedWorkplace.state}</span>
              </p>
            </div>
            <img
              src={selectedWorkplace.photo}
              alt={selectedWorkplace.name}
              className="w-14 h-14 rounded-xl object-cover border border-black/5 dark:border-white/10 shrink-0"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="mt-3 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[#34C759] font-medium">
                <Users className="w-3.5 h-3.5" />
                {selectedWorkers.length} Craft Workers Here
              </span>
              <span className="text-[#8E8E93]">
                {selectedWorkplace.openBenches} open benches
              </span>
            </div>
            <button
              onClick={() => {
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.flyTo([selectedWorkplace.lat, selectedWorkplace.lng], 14, { duration: 1.0 });
                }
              }}
              className="text-[#007AFF] font-medium hover:underline flex items-center gap-0.5"
            >
              Zoom In
            </button>
          </div>

          {/* Quick worker avatars stationed here */}
          {selectedWorkers.length > 0 && (
            <div className="mt-2.5 pt-2 border-t border-black/5 dark:border-white/10">
              <p className="text-[11px] font-medium text-[#8E8E93] mb-1.5">Skilled Workers at this Studio:</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedWorkers.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => onSelectWorker && onSelectWorker(w)}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.07] dark:hover:bg-white/[0.12] transition-colors text-left"
                  >
                    <img
                      src={w.avatar}
                      alt={w.name}
                      className="w-4 h-4 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xs font-medium text-[#1C1C1E] dark:text-white">{w.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
