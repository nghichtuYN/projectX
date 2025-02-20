import React from 'react'
type Props = {
  handleChange: (field: string, value: string) => void;
};
const SkillComponent = ({ handleChange }: Props) => {
  return (
    <div>SkillComponent</div>
  )
}

export default SkillComponent