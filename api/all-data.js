// Vercel Serverless Function - Converted from working proxy
// This matches your local proxy that was working

const WEBFLOW_CONFIG = {
    siteId: '655e0fa544c67c1ee5ce01a4',
    apiToken: process.env.WEBFLOW_API_TOKEN,
    baseUrl: 'https://api.webflow.com/v2'
};

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const headers = {
            'Authorization': `Bearer ${WEBFLOW_CONFIG.apiToken}`,
            'accept': 'application/json'
        };

        // Get collections first
        const collectionsResponse = await fetch(
            `${WEBFLOW_CONFIG.baseUrl}/sites/${WEBFLOW_CONFIG.siteId}/collections`,
            { headers }
        );
        const collectionsData = await collectionsResponse.json();
        
        // Find collection IDs by searching display names
        const collections = collectionsData.collections || [];
        
        console.log('📚 ALL COLLECTIONS FOUND:');
        collections.forEach(c => {
            console.log(`  - "${c.displayName}" (slug: ${c.slug}, id: ${c.id})`);
        });
        
        const speakersCollection = collections.find(c => 
            c.displayName?.toLowerCase().includes('speaker') || c.slug?.toLowerCase().includes('speaker')
        );
        const scheduleCollection = collections.find(c => 
            c.displayName?.toLowerCase().includes('schedule') || c.slug?.toLowerCase().includes('schedule')
        );
        const sponsorsCollection = collections.find(c => 
            c.displayName?.toLowerCase().includes('sponsor') || c.slug?.toLowerCase().includes('sponsor')
        );
        const stagesCollection = collections.find(c => 
            c.displayName?.toLowerCase().includes('stage') || c.slug?.toLowerCase().includes('stage')
        );
        const exhibitorsCollection = collections.find(c => 
            c.displayName?.toLowerCase().includes('exhibitor') || c.slug?.toLowerCase().includes('exhibitor')
        );
        const typesCollection = collections.find(c => 
            c.displayName?.toLowerCase().includes('typ') || c.slug?.toLowerCase().includes('typ')
        );
        
        console.log('✅ MATCHED COLLECTIONS:');
        console.log('  Speakers:', speakersCollection?.displayName || 'NOT FOUND');
        console.log('  Schedule:', scheduleCollection?.displayName || 'NOT FOUND');
        console.log('  Sponsors:', sponsorsCollection?.displayName || 'NOT FOUND');
        console.log('  Stages:', stagesCollection?.displayName || 'NOT FOUND');
        console.log('  Exhibitors:', exhibitorsCollection?.displayName || 'NOT FOUND');
        console.log('  Types:', typesCollection?.displayName || 'NOT FOUND');

        // Fetch all collections in parallel
        const [speakers, scheduleItems, sponsors, stagesList, exhibitors, typesList] = await Promise.all([
            speakersCollection ? 
                fetch(`${WEBFLOW_CONFIG.baseUrl}/collections/${speakersCollection.id}/items`, { headers })
                    .then(r => r.json()).then(d => d.items || []) : 
                Promise.resolve([]),
            scheduleCollection ? 
                fetch(`${WEBFLOW_CONFIG.baseUrl}/collections/${scheduleCollection.id}/items`, { headers })
                    .then(r => r.json()).then(d => d.items || []) : 
                Promise.resolve([]),
            sponsorsCollection ? 
                fetch(`${WEBFLOW_CONFIG.baseUrl}/collections/${sponsorsCollection.id}/items`, { headers })
                    .then(r => r.json()).then(d => d.items || []) : 
                Promise.resolve([]),
            stagesCollection ? 
                fetch(`${WEBFLOW_CONFIG.baseUrl}/collections/${stagesCollection.id}/items`, { headers })
                    .then(r => r.json()).then(d => {
                        const items = d.items || [];
                        // Filter for London event (Main Room at Indigo O2)
                        const filtered = items.filter(item => 
                            item.fieldData?.event === '386bc0edacc93d0d034fa7bff70938a2'
                        );
                        console.log(`🎪 STAGES: Found ${items.length} total stages, filtered to ${filtered.length} London stages`);
                        return filtered;
                    }) : 
                Promise.resolve([]),
            exhibitorsCollection ? 
                fetch(`${WEBFLOW_CONFIG.baseUrl}/collections/${exhibitorsCollection.id}/items`, { headers })
                    .then(r => r.json()).then(d => d.items || []) : 
                Promise.resolve([]),
            typesCollection ? 
                fetch(`${WEBFLOW_CONFIG.baseUrl}/collections/${typesCollection.id}/items`, { headers })
                    .then(r => r.json()).then(d => d.items || []) : 
                Promise.resolve([])
        ]);

        // Create lookup maps for stages and speakers
        const stagesMap = {};
        stagesList.forEach(stage => {
            stagesMap[stage.id] = stage.fieldData?.name || stage.fieldData?.['stage-name'] || 'Unknown Stage';
        });

        const speakersMap = {};
        speakers.forEach(speaker => {
            speakersMap[speaker.id] = {
                name: speaker.fieldData?.name || 'Unknown Speaker',
                company: speaker.fieldData?.['company-text'] || speaker.fieldData?.company || null
            };
        });

        const typesMap = {};
        typesList.forEach(type => {
            typesMap[type.id] = type.fieldData?.name || type.fieldData?.typ || 'Unknown Type';
        });

        // Filter schedule for MTMI: 25 and enhance with resolved names
        const schedule = scheduleItems
            .filter(item => item.fieldData?.event === '86742d9d05a1057c7f30ce72498d21da')
            .map(item => {
                const enhanced = { ...item };
                const fields = enhanced.fieldData;
                
                // Resolve stage name from ID
                if (fields.stage) {
                    enhanced.stageName = stagesMap[fields.stage] || 'Main Stage';
                }
                if (fields.stages) {
                    enhanced.stageName = stagesMap[fields.stages] || enhanced.stageName || 'Main Stage';
                }
                
                // Resolve speaker names from IDs (with company text for schedule feed)
                if (fields['speakers-2'] && Array.isArray(fields['speakers-2'])) {
                    enhanced.speakerNames = fields['speakers-2']
                        .map(id => {
                            const speaker = speakersMap[id];
                            if (!speaker) return null;
                            if (speaker.company) {
                                return `${speaker.name} (${speaker.company})`;
                            }
                            return speaker.name;
                        })
                        .filter(name => name)
                        .join(', ');
                }
                
                // Resolve type name from ID
                if (fields.typ) {
                    enhanced.typeName = typesMap[fields.typ] || null;
                } else if (fields.type) {
                    enhanced.typeName = typesMap[fields.type] || null;
                }
                
                return enhanced;
            });

        console.log(`📅 SCHEDULE: Found ${scheduleItems.length} total items, filtered to ${schedule.length} MTMI: 25 items`);
        console.log(`🎪 STAGES: Loaded ${Object.keys(stagesMap).length} stages`);
        console.log(`🎤 SPEAKERS: Loaded ${Object.keys(speakersMap).length} speakers`);
        console.log(`🏷️  TYPES: Loaded ${Object.keys(typesMap).length} types`);
        console.log(`🏢 EXHIBITORS: Loaded ${exhibitors.length} exhibitors`);

        res.status(200).json({
            speakers,
            schedule,
            sponsors,
            stages: stagesList,
            exhibitors
        });
    } catch (error) {
        console.error('Error fetching all data:', error);
        res.status(500).json({ error: error.message });
    }
};
