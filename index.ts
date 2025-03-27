interface Owner {
    name: string;
    age: number;
}

interface Vehicle {
    id: number;
    brand: string;
    model: string;
    year: number;
    isElectric: boolean;
    owner: Owner;
    features: string[];
}

function fetchData(url: string): void {
    const xhr = new XMLHttpRequest();
    const outputDiv = document.getElementById("output") as HTMLDivElement;

    xhr.open("GET", url, true);

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const data = JSON.parse(xhr.responseText) as { vehicles: Vehicle[] };
                console.log("Fetched data successfully:");
                console.log(data.vehicles);
                if (outputDiv) {
                    outputDiv.innerHTML = `<pre>${JSON.stringify(data.vehicles, null, 2)}</pre>`;
                }
            } catch (e) {
                console.error("Error parsing JSON:", e);
                if (outputDiv) outputDiv.innerHTML = "Error parsing JSON data.";
            }
        } else {
            console.error(`Request failed with status: ${xhr.status}`);
            if (outputDiv) {
                outputDiv.innerHTML = `Failed to fetch data. HTTP Status: ${xhr.status} - ${xhr.statusText}`;
            }
        }
    };

    xhr.onerror = function () {
        console.error("Network error occurred while fetching data");
        if (outputDiv) outputDiv.innerHTML = "Network error occurred.";
    };

    xhr.send();
}

console.log("Fetching data from data.json...");
fetchData("/data.json");

setTimeout(() => {
    console.log("\nSimulating error by fetching non-existent file...");
    fetchData("non_existent_file.json");
}, 1000);