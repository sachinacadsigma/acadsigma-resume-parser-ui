import { Pencil, X, Check, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { useJD } from '../redux/hooks/useJD';

interface Props {
  mustHave: string[];
  niceToHave: string[];
}

const SkillsSection: React.FC<Props> = ({ mustHave, niceToHave }) => {
  const { saveSkills } = useJD();
  const [editMustMode, setEditMustMode] = useState(false);
  const [editNiceMode, setEditNiceMode] = useState(false);

  const [localMust, setLocalMust] = useState<string[]>(mustHave);
  const [localNice, setLocalNice] = useState<string[]>(niceToHave);

  const [newSkill, setNewSkill] = useState({ type: '', value: '' });

  const removeSkill = (type: 'must' | 'nice', skill: string) => {
    if (type === 'must') setLocalMust(localMust.filter((s) => s !== skill));
    else setLocalNice(localNice.filter((s) => s !== skill));
  };

  const addSkill = () => {
    console.log(localMust);
    console.log([...localMust, newSkill.value]);

    if (!newSkill.value.trim()) return;
    if (newSkill.type === 'must') setLocalMust([...localMust, newSkill.value]);
    if (newSkill.type === 'nice') setLocalNice([...localNice, newSkill.value]);
    setNewSkill({ type: '', value: '' });
  };

  const saveChanges = () => {
    saveSkills({ mustHave: localMust, niceToHave: localNice });
    setEditMustMode(false);
    setEditNiceMode(false);
  };

  const cancelChanges = () => {
    setLocalMust(mustHave);
    setLocalNice(niceToHave);
    setEditMustMode(false);
    setEditNiceMode(false);
  };

  return (
    <div className='space-y-6 mt-8'>
      {/* Must-Have */}
      <div>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='font-semibold text-gray-800'>Must-Have Skills</h3>

          {!editMustMode ? (
            <button
              className='flex items-center gap-1 p-2 bg-gray-200 hover:bg-gray-300 rounded-md'
              onClick={() => setEditMustMode(true)}
            >
              <Pencil size={16} />
            </button>
          ) : (
            <div className='flex gap-2'>
              <button
                className='flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600'
                onClick={saveChanges}
              >
                Save <Check size={16} />
              </button>
              <button
                className='flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600'
                onClick={cancelChanges}
              >
                Cancel <X size={16} />
              </button>
            </div>
          )}
        </div>

        <div className='flex flex-wrap gap-2'>
          {localMust.length === 0 && !editMustMode && (
            <span className='text-gray-500 text-sm italic'>
              No skills added yet
            </span>
          )}

          {localMust.map((skill) => (
            <span
              key={skill}
              className='px-3 py-1 bg-white text-gray-600 rounded-md text-sm'
            >
              {skill}
              {editMustMode && (
                <button onClick={() => removeSkill('must', skill)}>
                  <X size={14} className='text-red-500' />
                </button>
              )}
            </span>
          ))}
        </div>

        {editMustMode && (
          <div className='flex gap-2 mt-2'>
            <input
              type='text'
              placeholder='Add skill...'
              className='border px-2 py-1 rounded-md text-sm'
              value={newSkill.type === 'must' ? newSkill.value : ''}
              onChange={(e) =>
                setNewSkill({ type: 'must', value: e.target.value })
              }
            />
            <button
              className='p-2 bg-gray-200 rounded-md hover:bg-gray-300'
              onClick={addSkill}
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Nice-To-Have */}
      <div>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='font-semibold text-gray-800'>Nice-to-Have Skills</h3>

          {!editNiceMode ? (
            <button
              className='flex items-center gap-1 p-2 bg-gray-200 hover:bg-gray-300 rounded-md'
              onClick={() => setEditNiceMode(true)}
            >
              <Pencil size={16} />
            </button>
          ) : (
            <div className='flex gap-2'>
              <button
                className='flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600'
                onClick={saveChanges}
              >
                Save <Check size={16} />
              </button>
              <button
                className='flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600'
                onClick={cancelChanges}
              >
                Cancel <X size={16} />
              </button>
            </div>
          )}
        </div>

        <div className='flex flex-wrap gap-2'>
          {localNice.length === 0 && !editNiceMode && (
            <span className='text-gray-500 text-sm italic'>
              No skills added yet
            </span>
          )}
          {localNice.map((skill) => (
            <span
              key={skill}
              className='px-3 py-1 bg-white text-gray-600 rounded-md text-sm'
            >
              {skill}
              {editNiceMode && (
                <button onClick={() => removeSkill('nice', skill)}>
                  <X size={14} className='text-red-500' />
                </button>
              )}
            </span>
          ))}
        </div>

        {editNiceMode && (
          <div className='flex gap-2 mt-2'>
            <input
              type='text'
              placeholder='Add skill...'
              className='border px-2 py-1 rounded-md text-sm'
              value={newSkill.type === 'nice' ? newSkill.value : ''}
              onChange={(e) =>
                setNewSkill({ type: 'nice', value: e.target.value })
              }
            />
            <button
              className='p-2 bg-gray-200 rounded-md hover:bg-gray-300'
              onClick={addSkill}
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
