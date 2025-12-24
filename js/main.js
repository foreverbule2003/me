import { db } from './firebase-config.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

async function loadTrips() {
    const listContainer = document.getElementById('trip-list');
    if (!listContainer) return;

    // Keep the "BACK" button separate or re-append it?
    // Let's assume the container is ONLY for trip items.
    // Wait, the design has items under "SELECT TRIP".
    
    // We will clear the container first
    listContainer.innerHTML = '<div class="text-center animate-pulse my-4">LOADING DATA...</div>';

    try {
        const tripsRef = collection(db, "trips");
        // Try to order by date, but might need index. Let's just get all for now.
        const q = query(tripsRef);
        const querySnapshot = await getDocs(q);

        listContainer.innerHTML = ''; // Clear loading

        if (querySnapshot.empty) {
            listContainer.innerHTML = '<div class="text-center my-4">NO TRIPS FOUND</div>';
            return;
        }
        
        const trips = [];
        querySnapshot.forEach((doc) => {
            trips.push({ id: doc.id, ...doc.data() });
        });

        // Sort by sortDate desc (Newest first)
        trips.sort((a, b) => {
             const dateA = a.sortDate || a.date || '';
             const dateB = b.sortDate || b.date || '';
             return dateB.localeCompare(dateA);
        });

        trips.forEach(trip => {
            const link = document.createElement('a');
            link.href = `trips/${trip.id}/index.html`;
            link.className = 'gb-btn menu-item';
            // Use title from DB
            link.innerText = trip.title || trip.id; 
            listContainer.appendChild(link);
        });

        // IMPORTANT: Trigger a custom event so gb-theme.js can re-scan focusable items
        // (Assuming gb-theme.js needs to know about new DOM elements for keyboard nav)
        document.dispatchEvent(new Event('content-loaded'));

    } catch (e) {
        console.error("Error loading trips:", e);
        listContainer.innerHTML = `<div class="text-center text-red-800 my-4">CONNECTION FAIL</div>`;
    }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', loadTrips);
