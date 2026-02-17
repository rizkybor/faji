'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';

const geoUrl = "/data/indonesia.json";

// Dummy data for active membership provinces
const activeProvinces = [
  "DKI JAKARTA",
  "JAWA BARAT",
  "SUMATERA UTARA",
  "SUMATERA BARAT",
  "SUMATERA SELATAN",
  "JAWA TIMUR",
  "JAWA TENGAH",
  "BALI",
  "NUSA TENGGARA TIMUR"
];

export default function MapSection() {
  const t = useTranslations('Index.about.map');
  const [content, setContent] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-faji-blue/10 text-faji-blue text-sm font-bold mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-faji-blue"></span>
            {t('subtitle')}
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6"
          >
            {t('title')}
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {t('description')}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-50 rounded-3xl p-4 md:p-8 lg:p-12 shadow-inner border border-gray-100 relative min-h-[300px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center"
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 2200,
              center: [118, -2]
            }}
            className="w-full h-full object-contain"
            width={1000}
            height={400}
          >
            <ZoomableGroup>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    // Match property name from typical Indonesia GeoJSON (usually 'Propinsi' or 'NAME_1')
                    // Adjust this based on your actual JSON file properties
                    const provinceName = (geo.properties.Propinsi || geo.properties.name || "").toUpperCase();
                    
                    // Normalize active provinces list for comparison
                    const isActive = activeProvinces.some(p => 
                      provinceName.includes(p.toUpperCase()) || p.toUpperCase().includes(provinceName)
                    );
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => {
                          setContent(`${provinceName} ${isActive ? '(Active)' : ''}`);
                        }}
                        onMouseLeave={() => {
                          setContent("");
                        }}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={`${provinceName}`}
                        style={{
                          default: {
                            fill: isActive ? "#1D63C1" : "#CBD5E1", // Active Blue / Potential Gray
                            outline: "none",
                            stroke: "#F9FAFB", // Gray-50 stroke
                            strokeWidth: 0.5
                          },
                          hover: {
                            fill: isActive ? "#154a96" : "#9CA3AF",
                            outline: "none",
                            cursor: "pointer",
                            stroke: "#F9FAFB",
                            strokeWidth: 0.5
                          },
                          pressed: {
                            fill: "#1e40af",
                            outline: "none",
                            stroke: "#F9FAFB",
                            strokeWidth: 0.5
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          
          <Tooltip 
            id="my-tooltip" 
            style={{ 
              backgroundColor: "#1F2937", 
              color: "#fff", 
              borderRadius: "8px", 
              padding: "8px 12px", 
              fontSize: "14px", 
              zIndex: 100 
            }} 
          />

          {/* Legend Card */}
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white/95 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-xl border border-gray-100 max-w-[200px] md:max-w-[250px] transition-all duration-300 hover:scale-105">
            <h4 className="font-bold text-gray-800 mb-3 text-sm md:text-lg">Legend</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 md:w-5 md:h-5 rounded bg-[#1D63C1] shadow-sm flex-shrink-0"></span>
                <span className="text-xs md:text-base text-gray-600 font-medium">Active Membership</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 md:w-5 md:h-5 rounded bg-[#CBD5E1] shadow-sm flex-shrink-0"></span>
                <span className="text-xs md:text-base text-gray-600 font-medium">Potential Region</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
