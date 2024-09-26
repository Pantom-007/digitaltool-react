import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import SelectCommon from '../../components/Forms/SelectCommon';
import Input from '../../components/Forms/Input';
import Textarea from '../../components/Forms/Textarea';
import InputNumber from '../../components/Forms/InputNumber';

interface SelectOption {
  label: string;
}

const InstallTool: React.FC = () => {
  const options: SelectOption[] = [{ label: 'GPT-4' }, { label: 'Claude3' }];

  return (
    <DefaultLayout title="インスタツール">
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center">
          <div className="w-[20%]">
            <p className="text-black">LLM</p>
          </div>
          <div className="w-[80%]">
            <SelectCommon options={options} />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[20%]">
            <p className="text-black">テーマ</p>
          </div>
          <div className="w-[80%]">
            <Input initPlaceHolder="テーマ" />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[20%]">
            <p className="text-black">ターゲット</p>
          </div>
          <div className="w-[80%]">
            <Input initValue="" initPlaceHolder="ターゲット" />
          </div>
        </div>
        <div className="flex items-baseline">
          <div className="w-[20%]">
            <p className="text-black">その他の指示</p>
          </div>
          <div className="w-[80%]">
            <Textarea
              initValue={''}
              initPlaceholder={"URL(Optional)"}
            />
          </div>
        </div>
        <div className="flex items-baseline">
          <div className="w-[20%]">
            <p className="text-black">URL</p>
          </div>
          <div className="w-[80%]">
            <Textarea
              initValue={''}
              initPlaceholder={"URL(Optional)"}
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[20%]">
            <p className="text-black">ページ枚数</p>
          </div>
          <div className="w-[80%]">
            <InputNumber
              initValue={''}
              initPlaceholder="0"
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default InstallTool;
