# ChatGPT Bootstrap

本 repo 由 LiouLiou 名下 `Sixteenpct/*` Git 協作規則管理。

在 ChatGPT／小雀進行任何 Git write、批次改檔、commit、CI 修復或長時間 Git 施工前，必須先讀並遵守：

> `Sixteenpct/dev_garden/CHATGPT_GIT_GLOBAL_RULES.md`

其中 liveness / failure-safety 為硬規則：工具失速、CI failure、寫入無法驗證、state mismatch 或可能中斷時，停止新的 Git write，先向 LiouLiou 顯示 emergency checkpoint（最後 verified commit／已完成與未完成／CI／repo consistency／精確 resume point），並等待 LiouLiou 下一則訊息再恢復。

本檔只負責 Git 協作程序；repo-specific content / canonical 規則仍以本 repo 現有內容為準。
