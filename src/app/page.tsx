import Image from "next/image";

export default function Home() {
  const events = [
    {
      start: 1,
      end: 3,
    },
    {
      start: 3,
      end: 4,
    },
    {
      start: 1,
      end: 5,
    },
    {
      start: 1,
      end: 5,
    },
    {
      start: 8,
      end: 10,
    },
    {
      start: 8,
      end: 10,
    },
    {
      start: 8,
      end: 11,
    },
    {
      start: 8,
      end: 11,
    },
    {
      start: 9,
      end: 10,
    },
  ];

  /*
  const events = [
    {
      start: 0,
      end: 2,
    },
    {
      start: 1,
      end: 2,
    },
    {
      start: 1,
      end: 4,
    },
    {
      start: 3,
      end: 5,
    },
    {
      start: 4,
      end: 5,
    },
    {
      start: 20,
      end: 22,
    },
  ];*/

  const isOverlapping = (range1, range2) => {
    if (range1.end <= range2.start || range2.end <= range1.start) {
      return false;
    }
    return true;
  };

  function compareNumbers(a, b) {
    return a.start - b.start;
  }

  let result = events.sort(compareNumbers).map((event, eventIndex) => {
    const overlappingIndexes = events
      .map((item, i) => {
        if (isOverlapping(item, event) && i !== eventIndex) {
          return i;
        }
        return null;
      })
      .filter((f) => f);

    return {
      ...event,
      offsetX: null,
      width: 1 / (overlappingIndexes.length + 1),
      percentWidth: 0,
      height: event.end - event.start,
      overlappingIndexes,
    };
  });

  /*
result.map(m => {
  m.overlappingIndexes.map((idx) => {
    let off = 0;
    console.log({ m, off });
    if (!result[idx].offsetX) {
      off++;
      result[idx].offsetX = off;
    }
  })
  
})
*/

  function setOffsets(result, item) {
    if (!item.offsetX) {
      let off = 0;
      item.offsetX = off;

      item.overlappingIndexes.map((o) => {
        result[o].offsetX = off;
        off++;
      });
    }
    /*
  let o = 0;
  overlappingIndexes.map(item => {
    if (!result[item].offsetX) {
      result[item].offsetX = o;
      o++;
    }
    console.log({item, o})
  })
  */
  }

  /*
result = result.map((item, i) => {
  if (!item.offsetX) {
    return { ...item, offsetX: 0 }
  }
  // setOffsets(result, item)
})
*/

  result.map((item, index) => {
    if (!result[index].offsetX) {
      console.log({ index, o: result[index].offsetX });
      let off = 0;
      result[index].offsetX = off;
      const increment = 100 / (result[index].overlappingIndexes.length + 1);
      result[index].percentWidth = increment;
      off += increment;
      for (let i = 0; i < result[index].overlappingIndexes.length; i++) {
        if (!result[result[index].overlappingIndexes[i]].offsetX) {
          result[result[index].overlappingIndexes[i]].offsetX = off;
          result[result[index].overlappingIndexes[i]].percentWidth = increment;
          result[result[index].overlappingIndexes[i]].movedBy = index;
        }
        off += increment;
      }
    }
  });

  const slots = 24;

  return (
    <main>
      <div className="relative h-screen w-full">
        <div className="absolute w-full h-full">
          {[...Array(slots)].map((item, index) => (
            <div
              key={index}
              className="border-b border-b-gray-300 flex items-center px-2"
              style={{ height: `${100 / slots}%` }}
            >
              <div>{index + 1}</div>
            </div>
          ))}
        </div>
        <div className="absolute h-full left-10 top-0 right-0">
          {result.map((item, i) => (
            <div
              key={i}
              className="absolute z-50 rounded bg-blue-200/50 border-blue-800 border"
              style={{
                width: `${item.percentWidth}%`,
                left: `${item.offsetX}%`,
                top: `${(item.start / slots) * 100}%`,
                height: `${((item.end - item.start) / slots) * 100}%`,
              }}
            >
              {i} (X: {item.offsetX}/ Y: {item.start})
            </div>
          ))}
        </div>
      </div>
      <div>
        {result.map((item, i) => (
          <div key={i}>
            {i}: {JSON.stringify(item)}
          </div>
        ))}
      </div>
    </main>
  );
}
