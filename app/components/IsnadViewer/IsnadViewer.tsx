'use client';
import React, { Fragment, Suspense, useCallback } from 'react';
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
import { Transition, Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const nodeTypes = {
  custom: CustomNode
};

const initNodes = [
  {
    id: '1',
    type: 'custom',
    data: {
      name: 'Muhammad (ﷺ)',
      designation: 'Prophet of Allah',
      icon: '',
      id: 1
    },
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
    <>
      <div className="w-full h-screen border-l border-gray-100  border-t slideLeft hidden md:block">
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

      <div className="md:hidden">
        <Transition appear show={true} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={close}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <XMarkIcon
                className="fixed top-[10px] right-5 cursor-pointer z-50 w-5 h-5 text-gray-600"
                onClick={close}
              />

              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-xl transform overflow-hidden ring-tremor bg-white p-6 text-left align-middle shadow-tremor transition-all rounded-xl">
                    <div className="h-screen w-screen border-l border-gray-100  border-t slideLeft">
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
                        <Controls />
                      </ReactFlow>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default IsnadViewer;
