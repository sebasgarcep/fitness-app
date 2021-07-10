export function groupBy<T, G>(collection: Iterable<T>, groupFunction: (arg: T) => any): Map<G, T[]> {
    const groups = new Map<G, T[]>();
    for (const item of collection) {
        const label = groupFunction(item);
        if (!groups.has(label)) { groups.set(label, []); }
        groups.get(label)!.push(item);
    }
    return groups;
}