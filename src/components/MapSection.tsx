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
          className="bg-faji-blue/5 rounded-3xl p-4 md:p-8 shadow-inner border border-faji-blue/10 relative"
          style={{ minHeight: '500px' }}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 1500,
              center: [118, -2] 
            }}
            className="w-full h-full max-h-[600px]"
          >
            <ZoomableGroup>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const provinceName = (geo.properties.Propinsi || geo.properties.name || "").toUpperCase();
                    const isActive = activeProvinces.includes(provinceName);
                    
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
                        data-tooltip-content={`${provinceName} ${isActive ? '(Active FAJI Member)' : ''}`}
                        style={{
                          default: {
                            fill: isActive ? "#005EB8" : "#D1D5DB", // faji-blue for active, gray for inactive
                            outline: "none",
                            stroke: "#FFFFFF",
                            strokeWidth: 0.5
                          },
                          hover: {
                            fill: isActive ? "#004494" : "#9CA3AF", // Darker blue or darker gray on hover
                            outline: "none",
                            cursor: "pointer",
                            stroke: "#FFFFFF",
                            strokeWidth: 1
                          },
                          pressed: {
                            fill: "#003366",
                            outline: "none",
                            stroke: "#FFFFFF",
                            strokeWidth: 1
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          
          <Tooltip id="my-tooltip" style={{ backgroundColor: "#1F2937", color: "#fff", borderRadius: "8px", padding: "8px 12px", fontSize: "14px", fontWeight: "bold" }} />

          {/* Legend or Stats Overlay */}
          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 hidden md:block">
            <h4 className="font-bold text-gray-900 mb-2">Legend</h4>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-4 h-4 rounded bg-faji-blue"></span>
              <span className="text-sm text-gray-600">Active Membership</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-gray-300"></span>
              <span className="text-sm text-gray-600">Potential Region</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
