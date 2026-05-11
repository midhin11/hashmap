export class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.size = 0;
        this.buckets = new Array(this.capacity);
    }

    increaseCapacity() {
        if(this.size > this.capacity * this.loadFactor) {
            this.capacity *= 2;
            let oldBucket = this.buckets;
            this.buckets = new Array(this.capacity);
            this.size = 0;

            for(let bucket of oldBucket) {
                if(bucket === undefined) continue;
                for(let kvpair of bucket) {
                    this.set(kvpair[0], kvpair[1]);
                }
            }
        }
        return;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        let index = this.hash(key); // index is the hashcode

        // each bucket in buckets is an array which is checked if empty or not
        if(this.buckets[index] === undefined) {  
            this.buckets[index] = [];
            this.buckets[index].push([key, value]);
            
            this.size++;
            this.increaseCapacity();
            return;
        }

        else {
            for(let kvpair of this.buckets[index]) {
                if(kvpair[0] === key) {
                    kvpair[1] = value;
                    return;
                }
            }

            this.buckets[index].push([key, value]);
            this.size++
            this.increaseCapacity();
            return;
        }
    }

    get(key) {
        if(this.buckets.length === 0) return null;
        let index = this.hash(key);
        if(this.buckets[index] === undefined) return null;

        for(let kvpair of this.buckets[index]) {
            if(kvpair[0] === key) return kvpair[1];
        }
        return null; 
    }

    has(key) {
        if(this.buckets.length === 0) return false;
        let index = this.hash(key);
        if(this.buckets[index] === undefined) return false;

        for(let kvpair of this.buckets[index]) {
            if(kvpair[0] === key) return true;
        }
        return false;
    }

    remove(key) {
        if(this.buckets.length === 0) return false;
        let index = this.hash(key);
        if(this.buckets[index] === undefined) return false;
        
        let old = this.buckets[index];
        this.buckets[index] = this.buckets[index].filter(kvpair => kvpair[0] !== key);
        
        if(old.length === this.buckets[index].length) return false;
        else {
            this.size--;
            return true;
        }
    }

    length() {
        return this.size;
    }

    clear() {
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
        this.size = 0;
    }

    keys() {
        let keys = [];
        for(let bucket of this.buckets) {
            if(bucket === undefined) continue;
            for(let kvpair of bucket) {
                keys.push(kvpair[0]);
            }
        }
        return keys
    }

    values() {
        let values = [];
        for(let bucket of this.buckets) {
            if(bucket === undefined) continue;
            for(let kvpair of bucket) {
                values.push(kvpair[1]);
            }
        }
        return values;
    }

    entries() {
        let entries = [];
        for(let bucket of this.buckets) {
            if(bucket === undefined) continue;
            for(let kvpair of bucket) {
                entries.push(kvpair);
            }
        }
        return entries;
    }

    getCapacity() {
        return this.capacity;
    }
}


