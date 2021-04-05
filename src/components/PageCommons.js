/**
 * Auther: APIS 
 */
import ModalPreImg from '@/pages/Modals/ModalPreImg'; 
import FileExport from '@/components/FileExport';
import Loading from '@/components/Loading';


const PageCommons = props=> {
  const { urlFileExport, loading, dispatch } = props;
  return (
    <>
      {/* 图片预览 */}
      <ModalPreImg />
      {/* 文件下载 */}
      <FileExport url={urlFileExport} dispatch={dispatch} />
      {/* 全局loading */}
      <Loading loading={loading} />
    </>
  )
};
export default PageCommons;