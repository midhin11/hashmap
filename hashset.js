export class HashSet {
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
                for(let key of bucket) {
                    this.add(key);
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

    add(key) {
        let index = this.hash(key); // index is the hashcode

        // each bucket in buckets is an array which is checked if empty or not
        if(this.buckets[index] === undefined) {  
            this.buckets[index] = [];
            this.buckets[index].push(key);
            
            this.size++;
            this.increaseCapacity();
            return;
        }

        else {
            for(let keyItem of this.buckets[index]) {
                if(keyItem === key) {
                    return;
                }
            }

            this.buckets[index].push(key);
            this.size++
            this.increaseCapacity();
            return;
        }
    }

    has(key) {
        if(this.buckets.length === 0) return false;
        let index = this.hash(key);
        if(this.buckets[index] === undefined) return false;

        for(let keyItem of this.buckets[index]) {
            if(keyItem === key) return true;
        }
        return false;
    }

    remove(key) {
        if(this.buckets.length === 0) return false;
        let index = this.hash(key);
        if(this.buckets[index] === undefined) return false;
        
        let removeIndex = this.buckets[index].indexOf(key);
        if(removeIndex !== -1) {
            this.buckets[index].splice(removeIndex, 1);
            if(this.buckets[index].length === 0) this.buckets[index] = undefined;
            this.size--;
            return true;
        } 
        else return false;
        
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
            for(let keyItem of bucket) {
                keys.push(keyItem);
            }
        }
        return keys
    }

    getCapacity() {
        return this.capacity;
    }
}


