import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency) {
    const [usdRate, setUsdRate] = useState(null); // Rate for USD
    const [inrRate, setInrRate] = useState(null); // Rate for INR
    const [error, setError] = useState(null); // Error handling
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Fetch data only if baseCurrency is provided
        if (!baseCurrency) return;

        setLoading(true); // Set loading to true before fetching
        fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch currency data");
                }
                return res.json();
            })
            .then((res) => {
                setUsdRate(res.rates.USD); // Get the rate for USD
                setInrRate(res.rates.INR); // Get the rate for INR
                setError(null); // Clear any previous error
            })
            .catch((err) => {
                setError(err.message);
                setUsdRate(null);
                setInrRate(null);
            })
            .finally(() => {
                setLoading(false); // Set loading to false after the operation
            });
    }, [baseCurrency]);

    return { usdRate, inrRate, error, loading }; // Return the rates, error, and loading state
}

export default useCurrencyInfo;
