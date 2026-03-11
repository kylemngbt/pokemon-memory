import { useState, useCallback } from "react";

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

// In-memory cache — persists for the session, resets on refresh
const cache = new Map<number, Pokemon>();

const TOTAL_POKEMON = 1010; // Total available in PokeAPI

function getRandomIds(count: number): number[] {
  const ids = new Set<number>();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * TOTAL_POKEMON) + 1);
  }
  return Array.from(ids);
}

export function usePokemon() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = useCallback(async (count: number) => {
    setLoading(true);
    setError(null);
    setPokemon([]);

    try {
      const ids = getRandomIds(count);

      const results = await Promise.all(
        ids.map(async (id) => {
          // Return from cache if already fetched
          if (cache.has(id)) return cache.get(id)!;

          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          if (!res.ok) throw new Error(`Failed to fetch Pokémon #${id}`);
          const data = await res.json();

          const p: Pokemon = {
            id: data.id,
            name: data.name,
            image:
              data.sprites.front_default,
          };

          cache.set(id, p);
          return p;
        })
      );

      setPokemon(results);
    } catch (err) {
      setError("Failed to load Pokémon. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { pokemon, loading, error, fetchPokemon };
}