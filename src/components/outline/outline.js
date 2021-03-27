import PropTypes from 'prop-types';
import React, { createContext, useContext, useRef, useState } from 'react';

import OrderedMap from './ordered-map';

const Context = createContext({});

// [
//   'Introduction',
//   [
//     'Synopsis',
//     'Adventure Hook',
//     'Adventure Background',
//   ],
//   '1. [Chapter 1 Name]',
//   [
//     'Map',
//     [
//       'M1. Location',
//       'M2. Location',
//       'M3. Location',
//       'M4. Location',
//     ],
//   ],
//   '2. [Chapter 2 Name]',
//   [
//     'Suggested Word Count',
//   ],
//   '3. [Chapter 3 Name]',
//   [
//     'Suggested Word Count',
//   ],
//   'Conclusion',
//   [
//     'Outcome #1',
//     [
//       'Development',
//     ],
//     'Outcome #2',
//     [
//       'Development',
//     ],
//   ],
//   'Afterword',
//   [
//     'Author’s Notes',
//     'Acknowledgments',
//     'Author Bio',
//     'Art Credits',
//   ],
// ]

export default function OutlineProvider({ children }) {
  const [ outline, setOutline ] = useState([]);
  const lastRef = useRef();
  const outlineRef = useRef(new OrderedMap());
  const timerRef = useRef();

  function register(level, name, ref) {
    const changed = outlineRef.current.set(ref, [ level, name ], lastRef.current);
    lastRef.current = ref;

    if (changed) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setOutline(outlineRef.current.output);
      }, 0);
    }
  }

  return (
    <Context.Provider value={{ outline, register }}>
      {children}
    </Context.Provider>
  );
}

OutlineProvider.propTypes = {
  children: PropTypes.node,
};

export function useOutline() {
  const { outline } = useContext(Context);
  return outline;
}

export function useOutlineRef(level, name) {
  const ref = useRef();
  const { register } = useContext(Context);

  if (typeof register === 'function') {
    if (typeof name === 'string') {
      register(level, name, ref);
    }
  }

  return ref;
}
