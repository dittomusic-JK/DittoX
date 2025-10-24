// Vercel Serverless Function - api/all-data.js
const axios = require('axios');
 
// Webflow API Configuration
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const SITE_ID = '655e0fa544c67c1ee5ce01a4';

const COLLECTION_IDS = {
    speakers: '655e0fa544c67c1ee5ce01cb',
    schedule: '655e0fa544c67c1ee5ce01c9',
    sponsors: '655e0fa544c67c1ee5ce01d2',
    stages: '655e0fa544c67c1ee5ce01c8',
    exhibitors: '686d0e5c8b5fa9db95a0e47e'
};

// Fetch from Webflow
async function fetchCollection(collectionId) {
    try {
        const response = await axios.get(
            `https://api.webflow.com/v2/collections/${collectionId}/items`,
            {
                headers: {
                    'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
                    'accept-version': '1.0.0'
                }
            }
        );
        return response.data.items || [];
    } catch (error) {
        console.error(`Error fetching ${collectionId}:`, error.message);
        return [];
    }
}

// Process schedule with relationships
function processScheduleItems(scheduleItems, speakers, stages) {
    return scheduleItems.map(item => {
        const speakerIds = item.fieldData?.speakers || [];
        const stageId = item.fieldData?.stage;
        
        const relatedSpeakers = speakers.filter(s => speakerIds.includes(s.id));
        const speakerNames = relatedSpeakers
            .map(s => s.fieldData?.name)
            .filter(Boolean)
            .join(', ');
        
        const relatedStage = stages.find(s => s.id === stageId);
        const stageName = relatedStage?.fieldData?.name || '';
        
        return {
            ...item,
            speakerNames,
            stageName,
            relatedSpeakers
        };
    });
}

// Vercel Serverless Function Handler
module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        console.log('Fetching all collections...');
        
        const [speakers, schedule, sponsors, stages, exhibitors] = await Promise.all([
            fetchCollection(COLLECTION_IDS.speakers),
            fetchCollection(COLLECTION_IDS.schedule),
            fetchCollection(COLLECTION_IDS.sponsors),
            fetchCollection(COLLECTION_IDS.stages),
            fetchCollection(COLLECTION_IDS.exhibitors)
        ]);
        
        const processedSchedule = processScheduleItems(schedule, speakers, stages);
        
        const data = {
            speakers,
            schedule: processedSchedule,
            sponsors,
            stages,
            exhibitors
        };
        
        console.log('✓ Data fetched:', {
            speakers: speakers.length,
            schedule: schedule.length,
            sponsors: sponsors.length,
            stages: stages.length,
            exhibitors: exhibitors.length
        });
        
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch data',
            message: error.message 
        });
    }
};
