import React, { Suspense, useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Position
} from 'reactflow';

import 'reactflow/dist/base.css';

import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode
};

const initNodes = [
  {
    id: '1',
    type: 'custom',
    data: { name: 'Muhammad (ﷺ)', designation: 'Prophet of Allah', icon: '' },
    position: { x: 0, y: 0 }
  },
  {
    id: '2',
    type: 'custom',
    data: {
      name: 'Umar bin Al-Khattab (RA)',
      designation: 'Sahabah/khalifah',
      icon: ''
    },

    position: { x: 0, y: 100 }
  },
  {
    id: '3',
    type: 'custom',
    data: { name: 'Alqamah ibn Waqqaas', designation: "Tabi'i", icon: '' },
    position: { x: 0, y: 200 }
  },
  {
    id: '4',
    type: 'custom',
    data: {
      name: 'Muhammad ibn Ibrahim At-Taymi',
      designation: '',
      icon: ''
    },
    position: { x: 0, y: 300 }
  },
  {
    id: '5',
    type: 'custom',
    data: {
      name: 'Yahya bin Sa’id Al-Ansary',
      designation: "Tabi'i",
      icon: ''
    },
    position: { x: 0, y: 400 }
  },
  {
    id: '6',
    type: 'custom',
    data: {
      name: 'Sufyaan ibn Uyaynah',
      designation: `Taba' Tab'aeen`
    },
    position: { x: 0, y: 500 }
  },
  {
    id: '7',
    type: 'custom',
    data: {
      name: 'Abdullah bin az-Zubair al-Humaidi'
    },
    position: { x: 0, y: 600 }
  },
  {
    id: '8',
    type: 'custom',
    data: {
      name: `Muhammad ibn Isma'il al-Bukhari`
    },
    position: { x: 0, y: 700 }
  }
];

const initEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2'
  },
  {
    id: 'e1-3',
    source: '2',
    target: '3'
  },
  {
    id: 'e1-4',
    source: '3',
    target: '4'
  },
  {
    id: 'e1-5',
    source: '4',
    target: '5'
  },
  {
    id: 'e1-6',
    source: '5',
    target: '6'
  },
  {
    id: 'e1-7',
    source: '6',
    target: '7'
  },
  {
    id: 'e1-8',
    source: '7',
    target: '8'
  }
];

const IsnadViewer = ({ close }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div className="w-full h-screen border-l border-gray-100  border-t slideLeft">
      <p
        className="absolute top-[50px] right-4 cursor-pointer z-50"
        onClick={close}
      >
        X
      </p>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-white"
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default IsnadViewer;
