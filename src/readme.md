### Prev and Next
Put an Icon instead of Text.

#### Prev
  <button
    className="prev-but"
    disabled={
      trackHistory.length <= 1
      || trackHistoryIndex === 0
    }
    onClick={prev}
  >Prev</button>

#### Next
  <button
    className="next-but"
    disabled={ activeMusic === '' }
    onClick={ next }
  >Next</button>
