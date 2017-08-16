//adapted from http://eloquentjavascript.net/1st_edition/appendix2.html
function BinaryHeap(type = 'min', valueFunction = x => x) {
    type = type.toLowerCase()
    if(!type.match(/(min|max)/)) { throw new Error("Invalid type parameter - 'min' or 'max'")}

    const data = []

    function bubbleUp(n) {
        const element = data[n],
            value = valueFunction(element)

        while (n > 0) {
            const parent = getParentNode(n),
                   parentIndex = getParentIndex(n)

            if (type === 'min' && value >= valueFunction(parent)) { break }
            if (type === 'max' && value <= valueFunction(parent)) { break }

            data[parentIndex] = element
            data[n] = parent
            n = getParentIndex(n)
        }
    }

    function sinkDown(n) {
        let element = data[n],
            elementValue = valueFunction(element)

        while (true) {
            let swap = null
            let leftChild = getLeftChild(n)
            let rightChild = getRightChild(n)

            if (type === 'min' && leftChild && valueFunction(leftChild) < elementValue) {
                swap = getLeftChildIndex(n)
            }

            if (type === 'min' && rightChild && valueFunction(rightChild) < (swap === null ? elementValue : leftChild)) {
                swap = getRightChildIndex(n)
            }

            if (type === 'max' && leftChild && valueFunction(leftChild) > elementValue) {
                swap = getLeftChildIndex(n)
            }

            if (type === 'max' && rightChild && valueFunction(rightChild) > (swap === null ? elementValue : leftChild)) {
                swap = getRightChildIndex(n)
            }

            if (swap == null) { break; }

            data[n] = data[swap]
            data[swap] = element
            n = swap
        }
    }

    function getParentIndex(n) {
        return Math.floor(((n + 1) / 2) - 1)
    }

    function getParentNode(n) {
        return data[getParentIndex(n)]
    }

    function getLeftChildIndex(n) {
        return (n * 2) + 1
    }

    function getRightChildIndex(n) {
        return (n * 2) + 2
    }

    function hasLeftChild(n) {
        if (!hasLeftChild(n)) { return null }
        return getLeftChildIndex(n) < data.length
    }

    function hasRightChild(n) {
        if (!hasRightChild(n)) { return null }
        return getRightChildIndex(n) < data.length
    }

    function getLeftChild(n) {
        return data[getLeftChildIndex(n)]
    }

    function getRightChild(n) {
        return data[getRightChildIndex(n)]
    }

    return {
        push: el => data.push(el) && bubbleUp(data.length - 1),
        pop: () => {
            const result = data[0]
            const end = data.pop()
            if (data.length > 0) {
                data[0] = end
                sinkDown(0)
            }
            return result
        },
        peek: () => data[0],
        size: () => data.length,
        check: () => data
    }
}