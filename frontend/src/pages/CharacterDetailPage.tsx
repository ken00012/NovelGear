import { useParams } from 'react-router-dom';

export default function CharacterDetailPage() {
  const { id } = useParams();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">キャラクター詳細</h1>
      <p>キャラクターID: {id}（プレースホルダー）</p>
    </div>
  );
}
